#!/usr/bin/env python3
"""
Decode base64 encoded PNG images and write them to files.
This script creates placeholder PNG images with solid colors.
"""

import base64
import os
from pathlib import Path

# Base64 encoded 1x1 solid color PNGs (we'll use these and clients will replace with proper sizes)
# For now, creating simple valid 1x1 PNGs that can be replaced later

SAMPLE_PNG_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/8+gHoAFBQIAX8jx0gAAAABJRU5ErkJggg=="

def create_png_files():
    """Create placeholder PNG files"""
    script_dir = Path(__file__).parent
    images_dir = script_dir / 'assets' / 'images'
    images_dir.mkdir(parents=True, exist_ok=True)
    
    # PNG signatures for different colors
    # These are small 100x100 solid color PNGs
    images = {
        'icon.png': 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIKSURBVHic7du9axNBHMfxi0vBBxCJL6AiFrESbWxsbW1tHWyrTdM6iK1tKwg22sbGP8DGwkZNa1IqFhYKgiAoCAkRxMdLvTy2yQySy87Nc98399ndHZxNmJ+5ubk5Zr52Z+7M7Zy7WVtbyzM/P5+fnJyM5+fn45ubm7s4Ho+XxsbGoj4+PnZ9fV1hGIaysbGRr1QqPj8/Px+TkxNtNpsVDocVDocVCoWUz+dVLBbfmvd6vbKxsaEIBALK6enp27MvFArK5XIqnU4rqVRKFotF+b4vxWIxGxoaUnd399uEv7+/VCwWlc/nVaFQULVaTZPJRHleV3d3t/r9f+jf31e3t7dyuVysUCgoiqJYs9lU1tZWVLlcVnV1dXd3d6s3gMr5vq8IhuEomUyqWCymwuGwAqAoighAyeVyajgcqmg0qgKBgNrb21PdblfNZjNlNBrV29ub+v7+Vux2u4rH4+rk5EQpiqLMZjNlNpsVuGazqVgsJh6PR+l0OjVzXJ/VatXDw0M5HA4VDocV13Utx5OEQiFVLpdVPB5XpVJJOZ1OxXEcRXNzc2pjY0Otb26p1dVVFYvFVCKRUL7v6/v7+59rGxsb6vv7+49oGhoalOVyqS4vL1UqlVJutztQVsm/v7+V3+9X7u7uSmvb7bbvb2hoSHm9XgWgpicnVO/Dgkz/qioAagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagFqAWoBagH+AjDcZxwOxQS2AAAAAElFTkSuQmCC',
        'icon.png': 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHKSURBVHic7duxagIxGADgf0kvXXRxcHB0cP+5gIg44uAiIg6iKOLQ4eUSh+6dXFxdHBQH13K5QHoq1hYsSbPpXb7f9313BEJy3y33pbllGWZnZzEYDLBYLLBYLNDr9RiGAZ1OBwBweXmJSqWCZrNJx2RZ5iAQCASCQCAQCAR+8U+SJPh8Puf0ixJI9Ho9R/MEQqFQGI/HM0cIBAKBQCAQCAR+8U8SHPh8Pufz+Xw4f7/fU8/3e3pxuVxyt9uRpmk0Go2o3+9Pz0kxN5tNzs7O6Ovri+r1Oo3HYwqHwySrVYobGwu6Pn+ndnvO4+MjzWYzajQalErFqNvtklkIBAKBQCAQCAR+8U8SHPh8Pvj9fshkMsTz/Iv8xpECppVKRS6XCzudDrlcLpJlmQRBoEKhQM+fz+f0/f1NCYJAQRCQJEmkKAoNx2Pq9XoUiUQoHo8Tr8F6vU67u1sqFAp0dXVF9/f3lE6nqdVqUa/Xo6enJ0qn0xQOh6lUKlEul6NCoUI7Oxs6PT2l5+fncnrO7OyshGHIMAxIkgSr1QqDwQDdbhfM+XwejuWEQqFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAR+8T8V9ZmGxnHvpgAAAABJRU5ErkJggg==',
        'adaptive-icon.png': 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHxSURBVHic7drBjYIwGAbg/xI7cfWCVzi4uHkHZwdnZw8eXVzggI68YHoAJ/ECnkBOmAhRBISSH5dLCdQP3/w0/V5IpJZVSZPmu1z/Pnlv5vM54+X5XIxGI2RZhlarBVVVIZrNZjAajeB5HrLZLFRVRTQahWAwCG6329LvdDpxuVxQr9eRz+dhGAZkWYZpmpDneVAUBe12F4nEIsQYGZmGEVJdXV2BIAjIZDIYDofC+TlJktBut3E+n1EQBMheW+1WBEJA8bqOS1VVrFYrJJNJlMul8R4mLpeL8rXVrqAIVDR6JBJJ7rlcjgKBgLhf7X21KyiqTfNl6+6LRjrQJ0Tz/lm9mPrKqKkKcqKEECJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQvwHeAMKrI/tVx38EQAAAABJRU5ErkJggg=='
    }
    
    for filename, b64_data in images.items():
        filepath = images_dir / filename
        try:
            png_bytes = base64.b64decode(b64_data)
            with open(filepath, 'wb') as f:
                f.write(png_bytes)
            print(f"✓ Created {filename}")
        except Exception as e:
            print(f"✗ Failed to create {filename}: {e}")
    
    print(f"\n✓ All placeholder PNG images created in {images_dir}")

if __name__ == '__main__':
    create_png_files()
