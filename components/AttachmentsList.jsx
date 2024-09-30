import React from "react";

const AttachmentsList = ({ attachments }) => {
  return (
    <div>
      <h3>Attachments</h3>
      <ul>
        {attachments.map((attachment) => (
          <li key={attachment.id}>
            <a
              href={attachment.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {attachment.fileUrl.split("/").pop()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttachmentsList;
