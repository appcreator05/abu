async function triggerGitHubBuild() {
    // 1. Form theke shob value collect kora
    const appTitle = document.querySelector('input[placeholder="My App"]').value.trim();
    const pkgPart1 = document.querySelectorAll('.package-inputs input')[0].value;
    const pkgPart2 = document.querySelectorAll('.package-inputs input')[1].value;
    const pkgPart3 = document.querySelectorAll('.package-inputs input')[2].value;
    const packageName = `${pkgPart1}.${pkgPart2}.${pkgPart3}`;
    
    const appUrl = document.querySelector('input[placeholder="https://yourwebsite.com"]').value.trim();
    const versionCode = document.querySelectorAll('.inline-fields input')[1].value;
    const versionName = document.querySelectorAll('.inline-fields input')[0].value;

    // Checkboxes status collect kora
    const supportZoom = document.querySelectorAll('.checkbox-list input')[0].checked;
    const textSelection = document.querySelectorAll('.checkbox-list input')[3].checked;
    const jsApis = document.querySelectorAll('.checkbox-list input')[6].checked;

    if(!appTitle || !appUrl) {
        alert('Please fill App Title and Website URL!');
        return;
    }

    // Apnar dewa GitHub Repository ebong Token
    const owner = 'appcreator05';
    const repo = 'abu';
    const token = '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';

    // 2. Payload data toiri kora
    const payload = {
        event_type: 'build_website_apk',
        client_payload: {
            app_title: appTitle,
            package_name: packageName,
            app_url: appUrl,
            version_code: versionCode,
            version_name: versionName,
            support_zoom: supportZoom,
            text_selection: textSelection,
            js_apis: jsApis
        }
    };

    try {
        let response = await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if(response.ok) {
            alert('Build successfully triggered on GitHub! Check your GitHub Actions tab to download the APK.');
        } else {
            alert('Failed to trigger build. Please check your GitHub Token permissions.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Connection error occurred!');
    }
}
