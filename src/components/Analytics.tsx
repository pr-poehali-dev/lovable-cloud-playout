import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Analytics = () => {
  const bitrateData = [
    { time: '00:00', stream1: 4500, stream2: 3200, stream3: 2800 },
    { time: '04:00', stream1: 4600, stream2: 3300, stream3: 2900 },
    { time: '08:00', stream1: 4400, stream2: 3100, stream3: 2700 },
    { time: '12:00', stream1: 4700, stream2: 3400, stream3: 3000 },
    { time: '16:00', stream1: 4800, stream2: 3500, stream3: 3100 },
    { time: '20:00', stream1: 4600, stream2: 3300, stream3: 2900 }
  ];

  const viewersData = [
    { time: '00:00', viewers: 850 },
    { time: '04:00', viewers: 420 },
    { time: '08:00', viewers: 950 },
    { time: '12:00', viewers: 1450 },
    { time: '16:00', viewers: 1850 },
    { time: '20:00', viewers: 2200 }
  ];

  const uptimeData = [
    { name: 'Main Channel', uptime: 99.8 },
    { name: 'Backup Stream', uptime: 99.5 },
    { name: 'Regional', uptime: 98.9 },
    { name: 'Event Stream', uptime: 95.2 },
    { name: 'Test Channel', uptime: 89.4 }
  ];

  const errorStats = [
    { type: 'Connection Lost', count: 12 },
    { type: 'Bitrate Drop', count: 8 },
    { type: 'Buffer Overflow', count: 5 },
    { type: 'Auth Failed', count: 3 },
    { type: 'Source Timeout', count: 2 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Icon name="Activity" size={20} className="text-primary" />
              Bitrate мониторинг
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bitrateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="stream1" stroke="hsl(var(--primary))" strokeWidth={2} name="Main Channel" />
                <Line type="monotone" dataKey="stream2" stroke="hsl(var(--success))" strokeWidth={2} name="Backup" />
                <Line type="monotone" dataKey="stream3" stroke="hsl(var(--warning))" strokeWidth={2} name="Regional" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Icon name="Users" size={20} className="text-primary" />
              Зрители (24 часа)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))'
                  }} 
                />
                <Line type="monotone" dataKey="viewers" stroke="hsl(var(--primary))" strokeWidth={3} fill="hsl(var(--primary))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Icon name="Clock" size={20} className="text-primary" />
              Uptime по потокам
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={uptimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))'
                  }} 
                />
                <Bar dataKey="uptime" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
              Статистика ошибок
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={errorStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="type" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))'
                  }} 
                />
                <Bar dataKey="count" fill="hsl(var(--destructive))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Средний Bitrate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-foreground">3,833</span>
              <span className="text-sm text-muted-foreground">kbps</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-success">
              <Icon name="TrendingUp" size={16} />
              <span className="text-sm">+5.2% за неделю</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Пиковая аудитория</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-foreground">2,634</span>
              <span className="text-sm text-muted-foreground">зрителей</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-success">
              <Icon name="TrendingUp" size={16} />
              <span className="text-sm">+12.8% за неделю</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Среднее время</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-foreground">97.8</span>
              <span className="text-sm text-muted-foreground">% uptime</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-muted-foreground">
              <Icon name="Minus" size={16} />
              <span className="text-sm">-0.3% за неделю</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
