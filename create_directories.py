#!/usr/bin/env python3
import os
import sys

def create_directories():
    base_path = r"c:\Job Portfolio\delivery-panda\rider-app"
    
    directories = [
        os.path.join(base_path),
        os.path.join(base_path, "app", "(auth)"),
        os.path.join(base_path, "app", "(rider)"),
        os.path.join(base_path, "app", "(drawer)"),
        os.path.join(base_path, "app", "(admin)"),
        os.path.join(base_path, "components", "ui"),
        os.path.join(base_path, "components", "layout"),
        os.path.join(base_path, "components", "order"),
        os.path.join(base_path, "components", "home"),
        os.path.join(base_path, "mock"),
        os.path.join(base_path, "store"),
        os.path.join(base_path, "constants"),
        os.path.join(base_path, "assets", "images"),
    ]
    
    try:
        for directory in directories:
            os.makedirs(directory, exist_ok=True)
        
        print("Directory structure created successfully!")
        print("\nCreated directories:")
        print("=" * 60)
        
        for root, dirs, files in os.walk(base_path):
            level = root.replace(base_path, "").count(os.sep)
            indent = "  " * level
            rel_path = os.path.relpath(root, os.path.dirname(base_path))
            print(f"{indent}{os.path.basename(root)}/")
            
            subindent = "  " * (level + 1)
            for directory in sorted(dirs):
                print(f"{subindent}{directory}/")
        
        return True
    except Exception as e:
        print(f"Error creating directories: {e}", file=sys.stderr)
        return False

if __name__ == "__main__":
    success = create_directories()
    sys.exit(0 if success else 1)
