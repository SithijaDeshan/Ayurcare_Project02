import React from 'react';

export function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });

    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Add leading zero to minutes if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${year} ${month} ${day} ${dayOfWeek} ${hours}.${minutes}`;
}

function FormatDateForEmail({ appointmentTime }) {
    return <div>{formatDate(appointmentTime)}</div>;
}

export default FormatDateForEmail;
