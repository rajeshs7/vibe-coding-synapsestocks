"""
NeuroSAN Stock Evaluation Server
Runs the stock evaluation agent using the working ns folder configuration
"""

import os
import sys
import signal
from pathlib import Path
from dotenv import load_dotenv

def signal_handler(sig, frame):
    print("\nShutting down server...")
    sys.exit(0)

def main():
    # Handle Ctrl+C gracefully
    signal.signal(signal.SIGINT, signal_handler)
    
    # Load environment variables from .env file
    load_dotenv()
    
    # Set paths to use local configuration
    current_dir = Path(__file__).parent
    ns_dir = Path("c:/Users/2421783/OneDrive - Cognizant/Desktop/VIbe Coding/vibe-coding-synapsestocks/ns/neuro_san")
    
    # Configure NeuroSAN environment
    os.environ["AGENT_MANIFEST_FILE"] = str(current_dir / "registries" / "manifest.hocon")
    os.environ["AGENT_TOOL_PATH"] = str(ns_dir / "coded_tools")
    
    # Add to Python path for imports
    sys.path.insert(0, str(ns_dir))
    sys.path.insert(0, str(ns_dir / "coded_tools"))
    
    # Set PYTHONPATH environment variable
    current_pythonpath = os.environ.get("PYTHONPATH", "")
    new_pythonpath = f"{ns_dir};{ns_dir / 'coded_tools'};{current_pythonpath}"
    os.environ["PYTHONPATH"] = new_pythonpath
    
    print("=" * 60)
    print("NeuroSAN Stock Evaluation Server")
    print("=" * 60)
    print(f"Manifest: {os.environ['AGENT_MANIFEST_FILE']}")
    print(f"Tools: {os.environ['AGENT_TOOL_PATH']}")
    print("Server: http://localhost:8080")
    print("Endpoint: /api/v1/stock_evaluator/streaming_chat")
    print("Press Ctrl+C to stop")
    print("=" * 60)
    
    try:
        # Change to ns directory and start server
        os.chdir(str(ns_dir.parent))
        from neuro_san.service.main_loop.server_main_loop import ServerMainLoop
        server = ServerMainLoop()
        server.main_loop()
    except KeyboardInterrupt:
        print("\nServer stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()