import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import {useEffect} from "react";
import {getEmailByPatientId, email} from "../../Components/api/AyurcareApiService"
import { toast, ToastContainer } from 'react-toastify';
import "./../../Styles/customToast.css"


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
      const roomID = getUrlParams().get('roomID') || randomID(5);
      const patientId = getUrlParams().get('patientId'); // Retrieve patientId from URL
    const token = localStorage.getItem('token')

      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 132307223;
      const serverSecret = "0f0ea378cd0e04aa2e05be868760ea28";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy link',
            url:
             window.location.protocol + '//' +
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },

      });

  };

    console.log(window.location.protocol + '//' +
        window.location.host + window.location.pathname +
        '?roomID=' +
        roomID,)

    const linkForMeeting = window.location.protocol + '//' +
        window.location.host + window.location.pathname +
        '?roomID=' +
        roomID;

    const handleSuccessToast = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            className: "custom-toast-success",
            autoClose: 5000 // Set the duration for the toast, e.g., 5000 ms (5 seconds)
        });
    };

    useEffect(() => {
        const RetriveEmailByPatientId = async () => {
            if (patientId && linkForMeeting) {
                try {
                    const response = await getEmailByPatientId(token, patientId);
                    console.log(response.data.medicaluserEmail);

                    let subject = "Invitation to Join a Video Conference with Your Doctor"
                    let body = `
                          <html>
                            <body>
                              <h1>Video Conference Invitation</h1>
                              <p>Dear Patient,</p>
                              <p>We are pleased to invite you to a video conference with your doctor.</p>
                              <p>You can join the video call by clicking the following link : <br><strong>${linkForMeeting}</strong></p>
                              <p>If you have any questions or need assistance, feel free to reach out to us.</p>
                              <p>Stay connected with us.</p>
                              <p>Best regards,<br>Ayurcare</p>
                            </body>
                          </html>
                        `;
                    let toEmail = response.data.medicaluserEmail
                    const emailPayload = {
                        toEmail,
                        subject,
                        body
                    }

                    console.log(emailPayload)
                    await email(emailPayload, token)

                    handleSuccessToast("The email containing the link has been successfully sent to the patient.");


                } catch (e) {
                    console.log(e);
                }
            } else {
                console.log("Can't find the User Email");
            }
        };

        RetriveEmailByPatientId();
    }, [patientId, token]);



    return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    >
        <ToastContainer />
    </div>
  );
}
