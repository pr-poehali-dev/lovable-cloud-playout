import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  const users = [
    { id: 1, name: 'Иван Петров', role: 'Администратор', email: 'ivan@example.com', status: 'active' },
    { id: 2, name: 'Мария Сидорова', role: 'Оператор', email: 'maria@example.com', status: 'active' },
    { id: 3, name: 'Алексей Смирнов', role: 'Оператор', email: 'alexey@example.com', status: 'active' },
    { id: 4, name: 'Елена Козлова', role: 'Наблюдатель', email: 'elena@example.com', status: 'inactive' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Настройки системы</h2>
        <p className="text-muted-foreground">Управление параметрами трансляции и пользователями</p>
      </div>

      <Tabs defaultValue="streaming" className="space-y-4">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="streaming">
            <Icon name="Radio" size={16} className="mr-2" />
            Трансляция
          </TabsTrigger>
          <TabsTrigger value="users">
            <Icon name="Users" size={16} className="mr-2" />
            Пользователи
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Icon name="Bell" size={16} className="mr-2" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger value="integration">
            <Icon name="Plug" size={16} className="mr-2" />
            Интеграции
          </TabsTrigger>
        </TabsList>

        <TabsContent value="streaming" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>RTMP настройки</CardTitle>
              <CardDescription>Конфигурация входящих RTMP потоков</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rtmp-url">RTMP Server URL</Label>
                <Input id="rtmp-url" placeholder="rtmp://live.example.com/app" defaultValue="rtmp://live.example.com/app" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stream-key">Stream Key</Label>
                <Input id="stream-key" type="password" placeholder="Введите stream key" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-reconnect">Автоматическое переподключение</Label>
                  <p className="text-sm text-muted-foreground">При обрыве связи пытаться восстановить поток</p>
                </div>
                <Switch id="auto-reconnect" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Качество потока</CardTitle>
              <CardDescription>Параметры кодирования и bitrate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bitrate">Целевой Bitrate (kbps)</Label>
                <Input id="bitrate" type="number" placeholder="4500" defaultValue="4500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resolution">Разрешение</Label>
                <Select defaultValue="1080p">
                  <SelectTrigger id="resolution">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2160p">4K (2160p)</SelectItem>
                    <SelectItem value="1080p">Full HD (1080p)</SelectItem>
                    <SelectItem value="720p">HD (720p)</SelectItem>
                    <SelectItem value="480p">SD (480p)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fps">FPS</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="fps">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 fps</SelectItem>
                    <SelectItem value="30">30 fps</SelectItem>
                    <SelectItem value="25">25 fps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Запись и архивация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-record">Автоматическая запись</Label>
                  <p className="text-sm text-muted-foreground">Записывать все трансляции автоматически</p>
                </div>
                <Switch id="auto-record" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-archive">Автоархивация</Label>
                  <p className="text-sm text-muted-foreground">Перемещать записи старше 30 дней в архив</p>
                </div>
                <Switch id="auto-archive" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Управление доступом пользователей</p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="UserPlus" size={16} className="mr-2" />
              Добавить пользователя
            </Button>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{user.role}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.status === 'active' ? 'Активен' : 'Неактивен'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Email уведомления</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notify-errors">Уведомления об ошибках</Label>
                  <p className="text-sm text-muted-foreground">При возникновении ошибок в потоках</p>
                </div>
                <Switch id="notify-errors" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notify-offline">Поток оффлайн</Label>
                  <p className="text-sm text-muted-foreground">Когда поток переходит в оффлайн</p>
                </div>
                <Switch id="notify-offline" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notify-quality">Падение качества</Label>
                  <p className="text-sm text-muted-foreground">При снижении битрейта или качества</p>
                </div>
                <Switch id="notify-quality" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Внешние платформы</CardTitle>
              <CardDescription>Интеграция с другими сервисами</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Icon name="Youtube" size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">YouTube Live</p>
                    <p className="text-sm text-muted-foreground">Мультитрансляция на YouTube</p>
                  </div>
                </div>
                <Button variant="outline">Подключить</Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Icon name="Twitch" size={20} className="text-white" fallback="Radio" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Twitch</p>
                    <p className="text-sm text-muted-foreground">Стриминг на Twitch</p>
                  </div>
                </div>
                <Button variant="outline">Подключить</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Отмена</Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};

export default Settings;
