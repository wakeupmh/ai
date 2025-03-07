### Requirements

- Python 3.8+
- Node.js and npm (for MCP aws server)
  - This is a critical requirement! The app uses `npx` to run the MCP GitHub server
  - Download and install from [nodejs.org](https://nodejs.org/)
- GitHub Personal Access Token with appropriate permissions
- OpenAI API Key

### Installation

1. Clone this repository
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Verify Node.js and npm are installed:
   ```bash
   node --version
   npm --version
   npx --version
   ```
   All of these commands should return version numbers. If they don't, please install Node.js.

4. Set up your API keys:
   - Set OpenAI API Key as an environment variable:
     ```bash
     export OPENAI_API_KEY=your-openai-api-key
     ```
   - GitHub token will be entered directly in the app interface

### Running the App

1. Start the Streamlit app:
   ```bash
   streamlit run app.py
   ```

2. In the app interface:
   - Enter your AWS credentials in the sidebar
   - Write your query in the box
   - Click "Run Query"
