from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        task = self.get_object()
        task.status = 'success'
        task.save()
        return Response({'status': 'task completed'})
    
    @action(detail=False, methods=['get'])
    def update_statuses(self, request):
        """Update task statuses based on deadlines"""
        now = timezone.now()
        # Find all ongoing tasks with passed deadlines
        expired_tasks = Task.objects.filter(status='ongoing', deadline__lt=now)
        updated_count = expired_tasks.update(status='failure')
        
        return Response({
            'updated_count': updated_count,
            'message': f'Updated {updated_count} tasks to failure status'
        })