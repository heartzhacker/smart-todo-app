import os
import django
import sys

# Set up Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_backend.settings')
django.setup()

from django.utils import timezone
from tasks.models import Task

def update_task_statuses():
    now = timezone.now()
    # Find all ongoing tasks with passed deadlines
    expired_tasks = Task.objects.filter(status='ongoing', deadline__lt=now)
    updated_count = expired_tasks.update(status='failure')
    print(f"Updated {updated_count} tasks to failure status")

if __name__ == "__main__":
    update_task_statuses()