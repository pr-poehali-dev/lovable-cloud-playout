import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

const StreamMonitor = () => {
  const streams = [
    {
      id: 1,
      name: 'Main Channel HD',
      status: 'online',
      bitrate: 4500,
      viewers: 1234,
      uptime: '12:34:56',
      quality: 95,
      rtmp: 'rtmp://live.example.com/stream1'
    },
    {
      id: 2,
      name: 'Backup Stream',
      status: 'online',
      bitrate: 3200,
      viewers: 856,
      uptime: '08:12:30',
      quality: 88,
      rtmp: 'rtmp://live.example.com/stream2'
    },
    {
      id: 3,
      name: 'Regional Channel',
      status: 'online',
      bitrate: 2800,
      viewers: 542,
      uptime: '15:45:12',
      quality: 92,
      rtmp: 'rtmp://live.example.com/stream3'
    },
    {
      id: 4,
      name: 'Test Channel',
      status: 'offline',
      bitrate: 0,
      viewers: 0,
      uptime: '00:00:00',
      quality: 0,
      rtmp: 'rtmp://live.example.com/stream4'
    },
    {
      id: 5,
      name: 'Event Stream',
      status: 'error',
      bitrate: 0,
      viewers: 0,
      uptime: '00:00:00',
      quality: 0,
      rtmp: 'rtmp://live.example.com/stream5'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return (
          <Badge className="bg-success text-success-foreground">
            <div className="w-2 h-2 bg-success-foreground rounded-full mr-2 pulse-online"></div>
            В эфире
          </Badge>
        );
      case 'offline':
        return (
          <Badge variant="secondary">
            Офлайн
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-destructive text-destructive-foreground">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            Ошибка
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {streams.map((stream) => (
        <Card key={stream.id} className="bg-card border-border hover:border-primary transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stream.status === 'online' ? 'bg-success/20' : 
                  stream.status === 'error' ? 'bg-destructive/20' : 'bg-muted'
                }`}>
                  <Icon 
                    name={stream.status === 'online' ? 'Radio' : stream.status === 'error' ? 'WifiOff' : 'CircleOff'} 
                    size={24} 
                    className={
                      stream.status === 'online' ? 'text-success' : 
                      stream.status === 'error' ? 'text-destructive' : 'text-muted-foreground'
                    }
                  />
                </div>
                <div>
                  <CardTitle className="text-lg text-foreground">{stream.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono">{stream.rtmp}</p>
                </div>
              </div>
              {getStatusBadge(stream.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Bitrate</p>
                <p className="text-lg font-semibold text-foreground">{stream.bitrate} kbps</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Зрители</p>
                <p className="text-lg font-semibold text-foreground">{stream.viewers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                <p className="text-lg font-semibold text-foreground font-mono">{stream.uptime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Качество</p>
                <div className="flex items-center gap-2">
                  <Progress value={stream.quality} className="h-2" />
                  <span className="text-sm font-semibold text-foreground">{stream.quality}%</span>
                </div>
              </div>
              <div className="flex gap-2">
                {stream.status === 'online' ? (
                  <>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Icon name="Pause" size={14} className="mr-1" />
                      Стоп
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="Settings" size={14} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Icon name="Play" size={14} className="mr-1" />
                      Запуск
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="Settings" size={14} />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StreamMonitor;
