import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Playlist = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoStartTime, setVideoStartTime] = useState('');
  
  const [playlist, setPlaylist] = useState([
    { id: 1, title: 'Утренний эфир', duration: '03:00:00', status: 'completed', startTime: '06:00', type: 'live' },
    { id: 2, title: 'Новости', duration: '00:30:00', status: 'completed', startTime: '09:00', type: 'video' },
    { id: 3, title: 'Спортивная программа', duration: '02:00:00', status: 'playing', startTime: '09:30', type: 'live' },
    { id: 4, title: 'Документальный фильм', duration: '01:30:00', status: 'scheduled', startTime: '11:30', type: 'video' },
    { id: 5, title: 'Обед с шеф-поваром', duration: '01:00:00', status: 'scheduled', startTime: '13:00', type: 'video' },
    { id: 6, title: 'Дневные новости', duration: '00:30:00', status: 'scheduled', startTime: '14:00', type: 'video' },
    { id: 7, title: 'Ток-шоу в прямом эфире', duration: '02:30:00', status: 'scheduled', startTime: '14:30', type: 'live' },
    { id: 8, title: 'Вечерний блок', duration: '03:00:00', status: 'scheduled', startTime: '17:00', type: 'video' }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'playing':
        return (
          <Badge className="bg-success text-success-foreground">
            <div className="w-2 h-2 bg-success-foreground rounded-full mr-2 pulse-online"></div>
            В эфире
          </Badge>
        );
      case 'completed':
        return <Badge variant="secondary">Завершено</Badge>;
      case 'scheduled':
        return <Badge className="bg-primary text-primary-foreground">Запланировано</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'live' ? 'Radio' : 'Film';
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setUploadedFile(file);
        setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
        toast({
          title: 'Файл выбран',
          description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} МБ)`
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Пожалуйста, выберите видеофайл',
          variant: 'destructive'
        });
      }
    }
  };

  const handleUploadVideo = () => {
    if (!uploadedFile || !videoTitle || !videoStartTime) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    const newVideo = {
      id: playlist.length + 1,
      title: videoTitle,
      duration: '00:00:00',
      status: 'scheduled',
      startTime: videoStartTime,
      type: 'video'
    };

    setPlaylist([...playlist, newVideo]);
    toast({
      title: 'Видео добавлено',
      description: `${videoTitle} добавлено в плейлист`
    });

    setUploadDialogOpen(false);
    setUploadedFile(null);
    setVideoTitle('');
    setVideoStartTime('');
  };

  const handleDeleteItem = (id: number) => {
    setPlaylist(playlist.filter(item => item.id !== id));
    toast({
      title: 'Удалено',
      description: 'Элемент удалён из плейлиста'
    });
  };

  const handleSkipNext = (currentId: number) => {
    const currentIndex = playlist.findIndex(item => item.id === currentId);
    const nextItem = playlist[currentIndex + 1];
    
    setPlaylist(playlist.map((item, index) => {
      if (item.id === currentId) return { ...item, status: 'completed' };
      if (index === currentIndex + 1) return { ...item, status: 'playing' };
      return item;
    }));

    toast({
      title: 'Переключено',
      description: nextItem ? `Сейчас в эфире: ${nextItem.title}` : 'Плейлист завершён'
    });
  };

  const handleStop = (id: number) => {
    setPlaylist(playlist.map(item => 
      item.id === id ? { ...item, status: 'scheduled' } : item
    ));
    toast({
      title: 'Эфир остановлен',
      description: 'Трансляция приостановлена',
      variant: 'destructive'
    });
  };

  const handleImport = () => {
    toast({
      title: 'Импорт плейлиста',
      description: 'Выберите JSON файл с плейлистом'
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(playlist, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `playlist_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    toast({
      title: 'Плейлист экспортирован',
      description: 'Файл сохранён'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Расписание эфира</h2>
          <p className="text-muted-foreground">Сегодня, 12 января 2026</p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Upload" size={16} className="mr-2" />
              Загрузить видео
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Загрузка видео в плейлист</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Выберите видеофайл и укажите время начала
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video-file" className="text-foreground">Видеофайл</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="video-file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icon name="Upload" size={16} className="mr-2" />
                  {uploadedFile ? uploadedFile.name : 'Выбрать файл'}
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="video-title" className="text-foreground">Название</Label>
                <Input
                  id="video-title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Название видео"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-foreground">Время начала</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={videoStartTime}
                  onChange={(e) => setVideoStartTime(e.target.value)}
                />
              </div>
              <Button
                onClick={handleUploadVideo}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить в плейлист
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">Плейлист</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleImport}>
                <Icon name="Upload" size={16} className="mr-2" />
                Импорт
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-border"></div>
            
            {playlist.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex items-start gap-4 p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0 ${
                  item.status === 'playing' ? 'bg-primary/5' : ''
                }`}
              >
                <div className="relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.status === 'playing' ? 'bg-success' :
                    item.status === 'completed' ? 'bg-muted' : 'bg-primary'
                  }`}>
                    {item.status === 'playing' && <div className="w-10 h-10 rounded-full bg-success pulse-online absolute"></div>}
                    <Icon 
                      name={getTypeIcon(item.type)} 
                      size={20} 
                      className={
                        item.status === 'completed' ? 'text-muted-foreground' : 'text-white'
                      }
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {item.startTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Timer" size={14} />
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name={getTypeIcon(item.type)} size={14} />
                          {item.type === 'live' ? 'Прямой эфир' : 'Видео'}
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  {item.status === 'playing' && (
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSkipNext(item.id)}
                      >
                        <Icon name="SkipForward" size={14} className="mr-1" />
                        След. элемент
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleStop(item.id)}
                      >
                        <Icon name="Square" size={14} className="mr-1" />
                        Стоп
                      </Button>
                    </div>
                  )}

                  {item.status === 'scheduled' && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Icon name="Edit" size={14} className="mr-1" />
                        Изменить
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Icon name="Trash2" size={14} className="mr-1" />
                        Удалить
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Playlist;