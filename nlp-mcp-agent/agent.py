import asyncio
import os
import streamlit as st
from textwrap import dedent
from agno.agent import Agent
from agno.tools.mcp import MCPTools
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

# Page config
st.set_page_config(page_title="📦 DynamoDB MCP Agent", page_icon="📦", layout="wide")

# Title and description
st.markdown("<h1 class='main-header'>📦 DynamoDB MCP Agent</h1>", unsafe_allow_html=True)
st.markdown("Query DynamoDB tables using natural language with Model Context Protocol")

# Sidebar for AWS credentials
with st.sidebar:
    st.header("🔑 AWS Credentials")
    aws_access_key = st.text_input("AWS Access Key", type="password", help="Enter your AWS Access Key")
    aws_secret_key = st.text_input("AWS Secret Key", type="password", help="Enter your AWS Secret Key")
    aws_region = st.text_input("AWS Region", value="us-east-1", help="Enter your AWS Region")

    if aws_access_key and aws_secret_key:
        os.environ["AWS_ACCESS_KEY_ID"] = aws_access_key
        os.environ["AWS_SECRET_ACCESS_KEY"] = aws_secret_key
        os.environ["AWS_REGION"] = aws_region

    st.markdown("---")
    st.markdown("### Example Queries")
    
    st.markdown("**Basic Queries**")
    st.markdown("- Show all users in the table")
    st.markdown("- Find orders with status 'pending'")
    
    st.markdown("**Aggregations**")
    st.markdown("- Count total orders in the last month")
    st.markdown("- Show average order value per user")
    
    st.markdown("---")
    st.caption("Ensure your AWS credentials have permission to access DynamoDB.")

# Query input
col1, col2 = st.columns([3, 1])
with col1:
    table_name = st.text_input("DynamoDB Table Name", value="Orders", help="Enter the name of your DynamoDB table")
with col2:
    query_type = st.selectbox("Query Type", [
        "Basic Query", "Aggregations", "Custom"
    ])

# Predefined queries
if query_type == "Basic Query":
    query_template = f"Find all records in {table_name}"
elif query_type == "Aggregations":
    query_template = f"Get total count of records in {table_name}"
else:
    query_template = ""

query = st.text_area("Your Query", value=query_template, placeholder="Ask a question about your DynamoDB data")

# Main function to run agent
async def run_dynamodb_agent(message):
    if not os.getenv("AWS_ACCESS_KEY_ID") or not os.getenv("AWS_SECRET_ACCESS_KEY"):
        return "Error: AWS credentials not provided"

    try:
        server_params = StdioServerParameters(
            command="npx",
            args=["-y", "@modelcontextprotocol/server-aws"],
        )
        
        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                mcp_tools = MCPTools(session=session)
                await mcp_tools.initialize()

                agent = Agent(
                    tools=[mcp_tools],
                    instructions=dedent("""\
                        You are a DynamoDB assistant. Help users query their database.
                        - Convert natural language to structured DynamoDB queries.
                        - Return results in a readable format.
                        - Provide useful insights when possible.
                        Use the following tools when you need to perform the queries:
                        - dynamodb_batch_get: Batch get multiple items from DynamoDB tables
                        - dynamodb_item_batch_write: Batch write operations (put/delete) for DynamoDB items
                        - dynamodb_batch_execute: Execute multiple PartiQL statements in a batch
                        - dynamodb_item_put: Put an item into a DynamoDB table
                        - dynamodb_item_get: Get an item from a DynamoDB table 
                        - dynamodb_item_update: Update an item in a DynamoDB table
                        - dynamodb_item_delete: Delete an item from a DynamoDB table
                        - dynamodb_item_query: Query items in a DynamoDB table
                        - dynamodb_item_scan: Scan items in a DynamoDB table
                    """),
                    markdown=True,
                    show_tool_calls=True,
                )

                response = await agent.arun(message)
                return response.content
    except Exception as e:
        return f"Error: {str(e)}"

# Run button
if st.button("🚀 Run Query", type="primary", use_container_width=True):
    if not aws_access_key or not aws_secret_key:
        st.error("Please enter your AWS credentials in the sidebar")
    elif not query:
        st.error("Please enter a query")
    else:
        with st.spinner("Querying DynamoDB..."):
            if table_name and table_name not in query:
                full_query = f"{query} in {table_name}"
            else:
                full_query = query
                
            result = asyncio.run(run_dynamodb_agent(full_query))
        
        # Display results
        st.markdown("### Results")
        st.markdown(result)

# Help text
if 'result' not in locals():
    st.markdown(
        """<div class='info-box'>
        <h4>How to use this app:</h4>
        <ol>
            <li>Enter your AWS credentials in the sidebar</li>
            <li>Specify your DynamoDB table name</li>
            <li>Select a query type or enter a custom query</li>
            <li>Click 'Run Query' to get results</li>
        </ol>
        <p><strong>Important Notes:</strong></p>
        <ul>
            <li>The Model Context Protocol (MCP) converts natural language to database queries</li>
            <li>More specific queries yield better results</li>
            <li>This app requires Node.js to be installed (for the npx command)</li>
        </ul>
        </div>""", 
        unsafe_allow_html=True
    )

# Footer
st.markdown("---")
st.write("Built with Streamlit, Agno, and Model Context Protocol ❤️")
