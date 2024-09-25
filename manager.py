from webui import webui
import subprocess, os, signal, time

server_pid = subprocess.Popen("python app.py").pid
print(f"[DEBUG] Started backend as pid {server_pid}")
my_window = webui.window()
my_window.show("frontend.html")
webui.wait()



""" need_to_exit = False
while need_to_exit == False:
    if my_window.is_shown():
        print("The window is still running")
    else:
        os.kill(server_pid, signal.SIGTERM)
        print(f"Sent SIGTERM signal to process {server_pid}")
        need_to_exit = True
print("manager exited") """
