# Random Emoji Generator

## Project Description

This is a random emoji generator application that displays random emojis from the EmojiHub API. The application fetches random emoji data including the emoji character, name, category, group, and unicode codes. Users can click on the displayed emoji to copy it to their clipboard. The interface is fully responsive and works seamlessly on desktop, tablet, and mobile devices. Users simply click the Generate Random Emoji button to get a new random emoji.

## API Details Used

### Base URL
https://emojihub.yurace.pro/api

### Endpoints

1. Random Emoji
   Endpoint: /random
   Method: GET
   Description: Retrieves a random emoji with all its details

2. Random Emoji by Category
   Endpoint: /random/category/{category}
   Method: GET
   Description: Fetches a random emoji from a specific category

3. Random Emoji by Group
   Endpoint: /random/group/{group}
   Method: GET
   Description: Returns a random emoji from a specific group

### Required Parameters

No parameters are required for the basic random emoji endpoint. The API is free to use and does not require authentication.

Optional Parameters:
- category: Filter by emoji category (optional) - Example: "smileys and people", "animals and nature"
- group: Filter by emoji group (optional) - Example: "person gesture", "face positive"

### Authentication

None
The EmojiHub API does not require authentication or an API key. It is a free, open API that can be used without registration.

### Sample JSON Response

{
  "name": "person bowing, type-3",
  "category": "smileys and people",
  "group": "person gesture",
  "htmlCode": [
    "&#128583;",
    "&#127996;"
  ],
  "unicode": [
    "U+1F647",
    "U+1F3FC"
  ]
}

### Fetch the Data (JavaScript)

The application uses the fetch() API with async/await to retrieve random emoji data:

async function fetchRandomEmoji() {
    showLoading();
    
    try {
        const url = API_BASE_URL + '/random';
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('May problema sa pagkuha ng emoji');
        }
        
        const data = await response.json();
        displayEmojiData(data);
        
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            showError('Walang internet connection o may problema sa server');
        } else {
            showError(error.message);
        }
    } finally {
        hideLoading();
    }
}

## Instructions to Run the Project

Step 1: Open the Project
Open the index.html file in a web browser. You can either:
- Double-click the index.html file to open it directly
- Use a local server like XAMPP, WAMP, or Live Server extension in VS Code
- Use Python's built-in server: python -m http.server 8000

Step 2: Use the Application
Click the Generate Random Emoji button to fetch and display a random emoji. The application will show the emoji along with its name, category, group, and unicode codes.

Step 3: Copy Emoji
Click on the displayed emoji to copy it to your clipboard. The emoji will briefly show "Copied!" to confirm the action.

Step 4: Troubleshooting
If you encounter errors:
- Check your internet connection
- Make sure you are using a local server if opening directly in browser causes CORS issues
- Verify that the EmojiHub API is accessible

