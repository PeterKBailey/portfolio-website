<h1>Keith Bailey Portfolio Website</h1>
<p>A website mostly about me</p>

<h2>Launching instructions</h2>
<ol>
    <li>Install all npm dependencies with `npm install`</li>
    <li>Generate certificate and key to run HTTPS server using:</li>
        <ul>
            <li>openssl req -nodes -x509 -new -keyout server.key -out server.cert</li>
            <li>Note: Add `winpty` at the beginning to generate with gitbash on windows</li>
        </ul>
    <li>Run the server with `node /src/server.js`</li>
    <li>Trust the certificate and proceed to the site (browsers will not trust by default because we are not a CA)</li>
</ol>

<h2>Dependencies</h2>
<ul>
    <li>Express NPM module</li>
    <li>HTTPS NPM module</li>
    <li>Node Mailer (~optional), this is how the contact form works, due to sensitive information required this was set up in a separate file which was then required by the server file</li>
</ul>