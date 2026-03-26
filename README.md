# 🚀 VectorShift Pipeline Builder

A dynamic, node-based visual workflow editor built for the VectorShift Frontend Technical Assessment. This application empowers users to design, connect, and evaluate complex pipelines using an intuitive drag-and-drop interface. It features a React-based frontend for canvas interactions and a Python backend for graph evaluation, specifically determining if the constructed pipeline forms a Directed Acyclic Graph (DAG).

## 📖 Description
The VectorShift Pipeline Builder simplifies the creation of logical workflows. Users can drag various node types (like LLMs, Inputs, Outputs, and Math operations) onto a canvas, connect them with interactive edges, and submit the entire graph for structural analysis. It is highly extensible, utilizing a customized abstraction layer to easily define and render new types of nodes.

Key Features:

Interactive Node Canvas: Seamless drag-and-drop node creation and manipulation.

Extensive Node Library: Includes Input, Output, LLM, Text, Code, Condition, Math (Multiply/Subtract), and Video Transcript nodes.

Dynamic Connecting Edges: Visually map data flow between nodes with intelligent handles.

DAG Validation: Backend integration to parse the pipeline and verify if it forms a valid Directed Acyclic Graph (no infinite loops).

Scalable Architecture: Built with an abstract node component (nodeabstract.js) to quickly scale the toolset without redundant code.

## 🧭 Table of Contents
🛠️ Tech Stack

⚙️ Installation

▶️ Usage

💡 Usage Examples

📂 Project Structure

🔌 API Documentation

🚧 Features

🔮 Future Improvements

🤝 Contributing

👤 Author

## 🛠️ Tech Stack
Frontend:

React.js (UI Framework)

React Flow (Node & Edge Canvas engine)

Tailwind CSS (Utility-first styling)

Zustand / Context API (State Management)

Backend:

Python 3

FastAPI (High-performance API routing)

Uvicorn (ASGI Web Server)

## ⚙️ Installation
1. Clone the repository

```bash
git clone https://github.com/nishaaddhabale/Nishaad_Dhabale_VectorShift.git
cd Nishaad_Dhabale_VectorShift
```

2. Backend Setup
Ensure you have Python 3.9+ installed.

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install fastapi uvicorn
```

3. Frontend Setup

```bash
cd ../frontend
npm install
```

## ▶️ Usage

Start the Backend Server

```bash
cd backend
uvicorn main:app --reload --port 8000
```

The API will be available at http://localhost:8000.

Start the Frontend Application

```bash
cd frontend
npm start
```

The application will open automatically at http://localhost:3000.

## 💡 Usage Examples

Building a Workflow

Look at the Toolbar at the top/side of the screen.

Drag an Input Node and an LLM Node onto the canvas.

Click and drag from the output handle (right side) of the Input Node to the input handle (left side) of the LLM Node to create an edge.

Add an Output Node and connect the LLM Node to it.

Click the Submit button. The application will alert you with the number of nodes, number of edges, and whether your workflow is a valid DAG.

## 📂 Project Structure

```plaintext
├── backend/
│   ├── main.py              # FastAPI application and graph evaluation logic
│   └── .gitignore
├── frontend/
│   ├── public/              # Static assets (HTML, icons)
│   ├── src/
│   │   ├── components/      # Reusable UI components (Navs, Sliders, Modals)
│   │   │   ├── ui/          # Granular styled components
│   │   │   ├── nodeabstract.js # Base class/wrapper for all canvas nodes
│   │   │   └── ButtonEdge.js   # Custom React Flow edge logic
│   │   ├── nodes/           # Specific node implementations
│   │   │   ├── inputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── outputNode.js
│   │   │   ├── textNode.js
│   │   │   └── ... (math & logic nodes)
│   │   ├── App.js           # Main React Flow provider and canvas setup
│   │   ├── store.js         # Global state management for nodes and edges
│   │   ├── submit.js        # API submission logic
│   │   ├── toolbar.js       # Drag-and-drop node menu
│   │   └── ui.js            # Main layout wrapper
│   ├── package.json
│   └── tailwind.config.js
└── VectorShift - Frontend Technical Assessment Instructions.pdf
```

## 🔌 API Documentation

Pipeline Evaluation Route

Validates the structure of the constructed graph.

URL: /pipelines/parse

Method: POST

Content-Type: application/json

Request Body:

```json
{
  "nodes": [
    { "id": "node-1", "type": "input" },
    { "id": "node-2", "type": "llm" }
  ],
  "edges": [
    { "source": "node-1", "target": "node-2" }
  ]
}
```

Success Response:

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## 🚧 Features

[x] Extensible nodeabstract.js allows creating new node types in under 10 lines of code.

[x] Custom stylized edges using ButtonEdge.js.

[x] Support for diverse node logic (Code, Condition, Math, Video Transcript).

[x] Real-time graph validation (DAG detection) via Python backend.

[x] Fully responsive canvas grid with panning and zooming.

## 🔮 Future Improvements

Node Configuration: Add inline properties panels to configure specific parameters inside the Code and LLM nodes.

Save/Load Workflows: Integrate database support (e.g., PostgreSQL or MongoDB) to persist user pipelines across sessions.

Execution Engine: Expand the backend to actively execute the Python code or LLM prompts defined in the nodes.

Dark Mode: Implement a canvas theme toggle.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Fork the Project.

Create your Feature Branch (git checkout -b feature/NewNode).

Commit your Changes (git commit -m 'Add some NewNode').

Push to the Branch (git push origin feature/NewNode).

Open a Pull Request.

## 👤 Author

Nishaad Dhabale

GitHub: @nishaaddhabale

Other Projects: [FreeFlow, Mindstash, SwiftPay, Grampanchayat, BlueCarbon]
