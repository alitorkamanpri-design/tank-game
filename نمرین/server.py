#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
سرور محلی برای مدیریت اضافه‌کاری
Server Local for Overtime Management App
"""

import http.server
import socketserver
import os
import sys
import json
from pathlib import Path
from urllib.parse import urlparse, parse_qs

PORT = 8000
HANDLER = http.server.SimpleHTTPRequestHandler

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # اضافه کردن CORS headers برای دسترسی کروس‌اوریجین
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_GET(self):
        # اگر درخواست برای / بود، app.html رو بریگردان
        if self.path == '/':
            self.path = '/app.html'
        return super().do_GET()

    def log_message(self, format, *args):
        """پیام log رو بهتری بنویس"""
        print(f"[{self.log_date_time_string()}] {format % args}")

def run_server():
    """سرور رو اجرا کن"""
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print("=" * 60)
            print("🚀 سرور مدیریت اضافه‌کاری روشن است")
            print("=" * 60)
            print(f"\n📍 آدرس: http://127.0.0.1:{PORT}")
            print(f"📍 آدرس: http://localhost:{PORT}")
            print(f"\n✅ برنامه بر روی:\n   http://localhost:{PORT}/app.html")
            print(f"\n🎮 بازی‌ها بر روی:\n   http://localhost:{PORT}/games.html")
            print(f"\n⏸️  برای متوقف کردن: Ctrl+C")
            print("\n" + "=" * 60)
            print()
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n⏹️  سرور متوقف شد")
        print("✓ تا دفعه بعد!")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48 or e.errno == 98:  # Address already in use
            print(f"❌ خطا: پورت {PORT} در حال استفاده است")
            print("راه‌حل:")
            print(f"  1. پورت دیگری استفاده کن: python server.py 8001")
            print(f"  2. یا برنامه‌ای که از پورت {PORT} استفاده می‌کند رو ببند")
        else:
            print(f"❌ خطا: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # اگر پورت دیگری داده شده باشد
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
            print(f"📌 استفاده از پورت: {PORT}")
        except ValueError:
            print("❌ پورت باید یک عدد باشد")
            sys.exit(1)
    
    run_server()
