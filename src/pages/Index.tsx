import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import StreamMonitor from '@/components/StreamMonitor';
import Analytics from '@/components/Analytics';
import Playlist from '@/components/Playlist';
import Archive from '@/components/Archive';
import Settings from '@/components/Settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const streamStats = {
    total: 8,
    online: 5,
    offline: 2,
    error: 1
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Radio" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Cloud Playout</h1>
                <p className="text-sm text-muted-foreground">Broadcast Control Center</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full pulse-online"></div>
                <span className="text-sm text-foreground">System Online</span>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Operator
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 animate-fade-in">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего потоков</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">{streamStats.total}</span>
                <Icon name="Radio" size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">В эфире</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-success">{streamStats.online}</span>
                <div className="w-3 h-3 bg-success rounded-full pulse-online"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Офлайн</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-muted-foreground">{streamStats.offline}</span>
                <Icon name="CircleOff" size={24} className="text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ошибки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-destructive">{streamStats.error}</span>
                <Icon name="AlertTriangle" size={24} className="text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="playlist" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ListVideo" size={16} className="mr-2" />
              Плейлист
            </TabsTrigger>
            <TabsTrigger value="archive" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Archive" size={16} className="mr-2" />
              Архив
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <StreamMonitor />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>

          <TabsContent value="playlist">
            <Playlist />
          </TabsContent>

          <TabsContent value="archive">
            <Archive />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
