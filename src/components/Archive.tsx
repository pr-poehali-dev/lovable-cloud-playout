import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Archive = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [playerOpen, setPlayerOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const archives = [
    {
      id: 1,
      title: 'Утренний эфир - 11 января',
      date: '2026-01-11',
      duration: '03:00:00',
      size: '2.4 GB',
      quality: 'HD 1080p',
      views: 1234,
      status: 'ready'
    },
    {
      id: 2,
      title: 'Спортивный обзор недели',
      date: '2026-01-10',
      duration: '02:15:00',
      size: '1.8 GB',
      quality: 'HD 1080p',
      views: 856,
      status: 'ready'
    },
    {
      id: 3,
      title: 'Документальный фильм',
      date: '2026-01-09',
      duration: '01:30:00',
      size: '1.2 GB',
      quality: 'HD 720p',
      views: 542,
      status: 'ready'
    },
    {
      id: 4,
      title: 'Концерт симфонического оркестра',
      date: '2026-01-08',
      duration: '04:30:00',
      size: '3.6 GB',
      quality: 'HD 1080p',
      views: 2134,
      status: 'ready'
    },
    {
      id: 5,
      title: 'Новости - вечерний выпуск',
      date: '2026-01-07',
      duration: '00:45:00',
      size: '650 MB',
      quality: 'HD 1080p',
      views: 1542,
      status: 'ready'
    }
  ];

  const handlePlay = (id: number) => {
    setSelectedVideo(id);
    setPlayerOpen(true);
    const video = archives.find(a => a.id === id);
    toast({
      title: 'Воспроизведение',
      description: `Воспроизводится: ${video?.title}`
    });
  };

  const handleDownload = (id: number) => {
    const video = archives.find(a => a.id === id);
    toast({
      title: 'Загрузка начата',
      description: `Скачивание: ${video?.title} (${video?.size})`
    });
  };

  const handleShare = (id: number) => {
    const video = archives.find(a => a.id === id);
    const shareUrl = `https://cloud-playout.example.com/archive/${id}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: 'Ссылка скопирована',
        description: shareUrl
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Архив записей</h2>
          <p className="text-muted-foreground">Сохранённые трансляции и записи</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Input 
            placeholder="Поиск по названию..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-64"
          />
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Сегодня</SelectItem>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="all">Всё время</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {archives.map((archive) => (
          <Card key={archive.id} className="bg-card border-border hover:border-primary transition-colors">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-48 h-28 bg-secondary rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                  <Icon name="Play" size={48} className="text-primary opacity-80" />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {archive.duration}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-2">{archive.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {new Date(archive.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="HardDrive" size={14} />
                          {archive.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Monitor" size={14} />
                          {archive.quality}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          {archive.views.toLocaleString()} просмотров
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-success text-success-foreground">Готово</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handlePlay(archive.id)}
                    >
                      <Icon name="Play" size={14} className="mr-1" />
                      Воспроизвести
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownload(archive.id)}
                    >
                      <Icon name="Download" size={14} className="mr-1" />
                      Скачать
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleShare(archive.id)}
                    >
                      <Icon name="Share2" size={14} className="mr-1" />
                      Поделиться
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-muted-foreground">Показано 5 из 127 записей</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button variant="outline" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>

      <Dialog open={playerOpen} onOpenChange={setPlayerOpen}>
        <DialogContent className="bg-card border-border max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {selectedVideo && archives.find(a => a.id === selectedVideo)?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedVideo && archives.find(a => a.id === selectedVideo)?.quality} • {selectedVideo && archives.find(a => a.id === selectedVideo)?.duration}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <Icon name="Play" size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Видеоплеер (демо)</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Archive;