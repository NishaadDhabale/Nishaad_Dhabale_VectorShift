from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json
from collections import deque

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        data = json.loads(pipeline)
        nodes = data.get('nodes', [])
        edges = data.get('edges', [])

        num_nodes = len(nodes)
        num_edges = len(edges)


        is_dag_status = check_is_dag_dfs(nodes, edges)


        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_status
        }
    except Exception as e:
        return {"error": str(e)}

def check_is_dag_dfs(nodes, edges):

    adj = {str(node['id']): [] for node in nodes}

    for edge in edges:
        source = str(edge.get('source'))
        target = str(edge.get('target'))

        if source in adj:
            adj[source].append(target)


    state = {node_id: 0 for node_id in adj}

    def has_cycle(u):
        state[u] = 1

        for v in adj.get(u, []):

            if state.get(v) == 1:
                return True

            if state.get(v) == 0:
                if has_cycle(v):
                    return True

        state[u] = 2
        return False


    for node_id in state:
        if state[node_id] == 0:
            if has_cycle(node_id):
                return False

    return True