from webui import webui
import subprocess, os, signal, time

my_window = webui.window()
my_window.show("page1.html")
webui.wait()