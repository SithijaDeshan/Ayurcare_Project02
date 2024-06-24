//package com.project2.ayurcare.ayurcare_backend.Service;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//import org.apache.http.entity.ContentType;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.amazonaws.AmazonServiceException;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.model.ObjectMetadata;
//import com.project2.ayurcare.ayurcare_backend.DTO.MedicalRecordDTO;
//import com.project2.ayurcare.ayurcare_backend.buckets.BucketName;
//import com.project2.ayurcare.ayurcare_backend.entity.MedicalRecord;
//import com.project2.ayurcare.ayurcare_backend.repository.MedicalRecordRepository;
//
//@Service
//public class MedicalRecordService {
//    
//    @Autowired
//    private MedicalRecordRepository medicalRecordRepository;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    public List<MedicalRecordDTO> getMedicalRecordsForUser(String medicaluserId) {
//        List<MedicalRecord> medicalRecords = medicalRecordRepository.findByPatient_Medicaluser_MedicaluserId(medicaluserId);
//        return medicalRecords.stream()
//                .map(record -> modelMapper.map(record, MedicalRecordDTO.class))
//                .collect(Collectors.toList());
//    }
//    
//    
//    
//    
//    
//    
//    
//    
//    
//    private final AmazonS3 s3;
//
//	public MedicalRecordService(MedicalRecordRepository medicalRecordRepository, ModelMapper modelMapper, AmazonS3 s3) {
//		this.medicalRecordRepository = medicalRecordRepository;
//		this.modelMapper = modelMapper;
//		this.s3 = s3;
//	}
//    
//    public void save(String path, String fileName, Optional<java.util.Map<String, String>> optionalMetadata, InputStream inputStream) {
//    	ObjectMetadata metaData = new ObjectMetadata();
//    	optionalMetadata.ifPresent(map -> {
//    		if(!map.isEmpty()) {
//    			map.forEach((key,value) -> metaData.addUserMetadata(key, value));
//    		}
//    	});
//    	try {
//			s3.putObject(path, fileName,inputStream ,metaData);
//		} catch (AmazonServiceException e) {
//			throw new IllegalStateException("Failed to store image to s3", e);
//		}
//    }
//
////	public void uploadUserMedicalRecord(UUID medicalId, MultipartFile file) {
////		
////		
////	}
//
//	public void uploadUserMedicalRecord(String medicalId, MultipartFile file) {
//		
//		if(file.isEmpty()) {
//			throw new IllegalStateException("CAnnot upload empty file [" + file.getSize() + "]");
//		}
//		
//		if(!Arrays.asList(ContentType.IMAGE_JPEG.getMimeType(), ContentType.IMAGE_PNG.getMimeType(), ContentType.IMAGE_GIF.getMimeType()).contains(file.getContentType())) {
//			throw new IllegalStateException("File must be an image [" + file.getContentType() + "]");
//		}
//		
//		Map<String, String> metadata = new HashMap<>();
//		metadata.put("Content-Type", file.getContentType());
//		metadata.put("Content-Length", String.valueOf(file.getSize()));
//		
//		
//		String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), medicalId);
//		String filename = String.format("%s-%s", file.getName(), UUID.randomUUID());
//		try {
//			save(path,filename,Optional.of(metadata), file.getInputStream());
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			throw new IllegalStateException(e);
//		}
//		
//	}
//}


package com.project2.ayurcare.ayurcare_backend.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import com.project2.ayurcare.ayurcare_backend.DTO.MedicalRecordDTO;
import com.project2.ayurcare.ayurcare_backend.buckets.BucketName;
import com.project2.ayurcare.ayurcare_backend.entity.MedicalRecord;
import com.project2.ayurcare.ayurcare_backend.repository.MedicalRecordRepository;
import org.modelmapper.ModelMapper; // Import ModelMapper

@Service
public class MedicalRecordService {
    
    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private AmazonS3 s3;

    @Autowired
    private ModelMapper modelMapper; // Inject ModelMapper
    

    public List<MedicalRecordDTO> getMedicalRecordsForUser(String medicaluserId) {
        List<MedicalRecord> medicalRecords = medicalRecordRepository.findByPatient_Medicaluser_MedicaluserId(medicaluserId);
        return medicalRecords.stream()
                .map(record -> modelMapper.map(record, MedicalRecordDTO.class))
                .collect(Collectors.toList());
    }

    public void save(String path, String fileName, Optional<Map<String, String>> optionalMetadata, byte[] bytes) {
        ObjectMetadata metaData = new ObjectMetadata();
        optionalMetadata.ifPresent(map -> {
            if (!map.isEmpty()) {
                map.forEach(metaData::addUserMetadata);
            }
        });
        try (ByteArrayInputStream inputStream = new ByteArrayInputStream(bytes)) {
            s3.putObject(path, fileName, inputStream, metaData);
        } catch (AmazonServiceException | IOException e) {
            throw new IllegalStateException("Failed to store image to S3", e);
        }
    }

    public void uploadUserMedicalRecord(String medicalId, MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file [" + file.getSize() + "]");
        }

        // Content type validation
        if (!file.getContentType().startsWith("image")) {
            throw new IllegalStateException("File must be an image [" + file.getContentType() + "]");
        }
        
        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalId)
                .orElseGet(() -> {
                    MedicalRecord newMedicalRecord = new MedicalRecord();
                    newMedicalRecord.setMedicalId(medicalId);
                    return newMedicalRecord;
                });

        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));

        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), medicalId);
        String filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());
        try {
            save(path, filename, Optional.of(metadata), file.getBytes());
            medicalRecord.setMedicalRecord(filename);
            medicalRecordRepository.save(medicalRecord);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    public byte[] downloadUserMedicalRecord(String medicalId) {
        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), medicalId);

        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalId)
                .orElseGet(() -> {
                    MedicalRecord newMedicalRecord = new MedicalRecord();
                    newMedicalRecord.setMedicalId(medicalId);
                    return newMedicalRecord;
                });

        String medicalRecordFilename = medicalRecord.getMedicalRecord();
        if (medicalRecordFilename != null) {
            return download(path, medicalRecordFilename);
        } else {
            return new byte[0];
        }
    }


	private byte[] download(String path, String key) {
		try {
			S3Object object = s3.getObject(path, key);
			return IOUtils.toByteArray(object.getObjectContent());
		} catch (AmazonServiceException | IOException e) {
			throw new IllegalStateException("Failed to download fileto s3", e);
		}
	}
}
