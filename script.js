const generateBtn = document.getElementById('emojihub-generate-btn');
const loadingDiv = document.getElementById('emojihub-loading');
const errorDiv = document.getElementById('emojihub-error');
const resultsDiv = document.getElementById('emojihub-results');
const emojiElement = document.getElementById('emojihub-emoji');

generateBtn.addEventListener('click', handleGenerate);
emojiElement.addEventListener('click', copyEmoji);

//eto yung function pag clinick generate button
function handleGenerate() {
    fetchRandomEmoji();
}

function showError(message) {
    errorDiv.innerHTML = message;
    errorDiv.style.display = 'flex';
    resultsDiv.style.display = 'none';
}

function hideError() {
    errorDiv.style.display = 'none';
}


function showLoading() {
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    resultsDiv.style.display = 'none';
    generateBtn.disabled = true;
    generateBtn.textContent = 'Processing...';
}

function hideLoading() {
    loadingDiv.style.display = 'none';
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate Random Emoji';
}

//dito yung pag kuha ng random emoji galing sa api
async function fetchRandomEmoji() {
    showLoading();
    
    try {
        const url = API_BASE_URL + '/random';
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('error fetching emoji');
        }
        
        const data = await response.json();
        displayEmojiData(data);
        
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            showError('no internet connection or server error');
        } else {
            showError(error.message);
        }
    } finally {
        hideLoading();
    }
}

//display yung emoji data sa screen galing doon sa api
function displayEmojiData(data) {
    hideError();
    
    const htmlCode = data.htmlCode[0];
    emojiElement.innerHTML = htmlCode;
    emojiElement.setAttribute('data-emoji', htmlCode);
    
    document.getElementById('emojihub-emoji-name').textContent = data.name;
    document.getElementById('emojihub-emoji-category').textContent = data.category;
    document.getElementById('emojihub-group').textContent = data.group;
    document.getElementById('emojihub-unicode').textContent = data.unicode.join(', ');
    
    resultsDiv.style.display = 'block';
}


function copyEmoji() {
    if (!emojiElement.getAttribute('data-emoji')) {
        return;
    }
    
    const htmlCode = emojiElement.getAttribute('data-emoji');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlCode;
    const emojiText = tempDiv.textContent || tempDiv.innerText;
    
    navigator.clipboard.writeText(emojiText).then(function() {
        const originalText = emojiElement.textContent;
        emojiElement.textContent = 'copied';
        setTimeout(function() {
            emojiElement.innerHTML = htmlCode;
            emojiElement.setAttribute('data-emoji', htmlCode);
        }, 1000);
    }).catch(function() {
        showError('unable to copy emoji');
    });
}

