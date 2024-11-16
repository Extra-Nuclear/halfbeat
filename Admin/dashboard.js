// GitHub configuration
const config = {
    username: "Extra_Nuclear",
    repo: "halfbeat",
    path: "version.json",
    token: "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"
};

// Fetch and display the current version data
async function fetchVersion() {
    const responseMessage = document.getElementById('responseMessage');
    
    try {
        const response = await fetch(`https://api.github.com/repos/${config.username}/${config.repo}/contents/${config.path}`, {
            headers: {
                Authorization: `Bearer ${config.token}`,
                Accept: "application/vnd.github.v3.raw" // Ensures we get the raw file content
            }
        });
        
        if (!response.ok) throw new Error("Error fetching version file.");

        const versionData = await response.json();
        document.getElementById('latestVersion').value = versionData['latest version'];
        document.getElementById('publicVersion').value = versionData['public version'];
        
    } catch (error) {
        responseMessage.textContent = error.message;
    }
}

// Update the version.json file on GitHub
async function updateVersion() {
    const latestVersion = document.getElementById('latestVersion').value;
    const publicVersion = document.getElementById('publicVersion').value;
    const responseMessage = document.getElementById('responseMessage');

    try {
        // Step 1: Fetch the current version.json file to get the SHA (required for update)
        const response = await fetch(`https://api.github.com/repos/${config.username}/${config.repo}/contents/${config.path}`, {
            headers: {
                Authorization: `Bearer ${config.token}`
            }
        });
        
        if (!response.ok) throw new Error("Error fetching current file version.");
        const fileData = await response.json();

        // Step 2: Update the JSON content
        const updatedContent = {
            "latest version": latestVersion,
            "public version": publicVersion
        };

        // Step 3: Prepare the payload for the update request
        const payload = {
            message: "Update version.json via GitHub API",
            content: btoa(JSON.stringify(updatedContent, null, 4)), // Convert to Base64
            sha: fileData.sha // Required to update file
        };

        // Step 4: Send the PUT request to update version.json
        const updateResponse = await fetch(`https://api.github.com/repos/${config.username}/${config.repo}/contents/${config.path}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${config.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!updateResponse.ok) throw new Error("Error updating version file.");
        
        responseMessage.textContent = "Version updated successfully!";
        responseMessage.style.color = 'green';
    } catch (error) {
        responseMessage.textContent = error.message;
        responseMessage.style.color = 'red';
    }
}

// Load the current version on page load
window.onload = fetchVersion;
