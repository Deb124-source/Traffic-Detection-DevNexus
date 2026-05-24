import { useState } from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  AlertTriangle, 
  Car, 
  Users, 
  Clock, 
  MapPin,
  Menu,
  X,
  Activity,
  Shield,
  Zap
} from 'lucide-react'
import { Login } from './components/Login'
import { Signup } from './components/Signup'

// Mock data for the dashboard
const violationData = [
  { name: 'Mon', violations: 120 },
  { name: 'Tue', violations: 98 },
  { name: 'Wed', violations: 145 },
  { name: 'Thu', violations: 112 },
  { name: 'Fri', violations: 168 },
  { name: 'Sat', violations: 89 },
  { name: 'Sun', violations: 76 },
]

const violationTypes = [
  { name: 'Speeding', value: 35, color: '#ef4444' },
  { name: 'Red Light', value: 25, color: '#f97316' },
  { name: 'Parking', value: 20, color: '#eab308' },
  { name: 'Wrong Way', value: 12, color: '#22c55e' },
  { name: 'Other', value: 8, color: '#6b7280' },
]

const locationData = [
  { location: 'Main St', count: 245 },
  { location: 'Highway 101', count: 198 },
  { location: 'Market Rd', count: 156 },
  { location: 'School Zone', count: 89 },
  { location: 'Downtown', count: 134 },
]

const recentViolations = [
  { id: 1, type: 'Speeding', location: 'Main St', time: '2 min ago', plate: 'ABC-1234' },
  { id: 2, type: 'Red Light', location: 'Market Rd', time: '5 min ago', plate: 'XYZ-5678' },
  { id: 3, type: 'Parking', location: 'Downtown', time: '8 min ago', plate: 'DEF-9012' },
  { id: 4, type: 'Speeding', location: 'Highway 101', time: '12 min ago', plate: 'GHI-3456' },
  { id: 5, type: 'Wrong Way', location: 'School Zone', time: '15 min ago', plate: 'JKL-7890' },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authPage, setAuthPage] = useState('login') // 'login' or 'signup'

  const stats = [
    { label: 'Total Violations', value: '2,456', icon: AlertTriangle, change: '+12%', color: 'text-red-400' },
    { label: 'Vehicles Detected', value: '1,892', icon: Car, change: '+8%', color: 'text-blue-400' },
    { label: 'Active Cameras', value: '24', icon: Activity, change: '100%', color: 'text-green-400' },
    { label: 'Active Users', value: '156', icon: Users, change: '+5%', color: 'text-purple-400' },
  ]

  // Show login/signup pages if not authenticated
  if (!isAuthenticated) {
    return authPage === 'login' ? (
      <Login 
        onSwitchToSignup={() => setAuthPage('signup')}
        onLogin={() => setIsAuthenticated(true)}
      />
    ) : (
      <Signup 
        onSwitchToLogin={() => setAuthPage('login')}
        onSignup={() => setIsAuthenticated(true)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-dark-card border-r border-dark-border`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-dark-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <span className="text-xl font-bold text-white">Texibition</span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <NavItem 
              icon={TrendingUp} 
              label="Dashboard" 
              active={activeTab === 'dashboard'} 
              collapsed={!sidebarOpen}
              onClick={() => setActiveTab('dashboard')}
            />
            <NavItem 
              icon={AlertTriangle} 
              label="Violations" 
              active={activeTab === 'violations'} 
              collapsed={!sidebarOpen}
              onClick={() => setActiveTab('violations')}
            />
            <NavItem 
              icon={Car} 
              label="Vehicles" 
              active={activeTab === 'vehicles'} 
              collapsed={!sidebarOpen}
              onClick={() => setActiveTab('vehicles')}
            />
            <NavItem 
              icon={MapPin} 
              label="Locations" 
              active={activeTab === 'locations'} 
              collapsed={!sidebarOpen}
              onClick={() => setActiveTab('locations')}
            />
            <NavItem 
              icon={Users} 
              label="Users" 
              active={activeTab === 'users'} 
              collapsed={!sidebarOpen}
              onClick={() => setActiveTab('users')}
            />
          </nav>

          {/* Settings */}
          <div className="p-4 border-t border-dark-border">
            <NavItem 
              icon={Zap} 
              label="Settings" 
              active={activeTab === 'settings'} 
              collapsed={!sidebarOpen}
              onClick={() => setActiveTab('settings')}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-between px-6">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-dark-border rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-border rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">System Online</span>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false)
                setAuthPage('login')
              }}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-border rounded-lg transition-colors"
            >
              Logout
            </button>
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">AD</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-dark-bg rounded-lg ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm text-green-400">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Weekly Violations Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Weekly Violations</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={violationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="violations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Violation Types Pie Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Violation Types</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={violationTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {violationTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {violationTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                    <span className="text-sm text-gray-300">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Location Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Top Locations</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={locationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis dataKey="location" type="category" stroke="#9ca3af" width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Violations */}
            <div className="card lg:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Violations</h3>
              <div className="space-y-3">
                {recentViolations.map((violation) => (
                  <div 
                    key={violation.id}
                    className="flex items-center justify-between p-3 bg-dark-bg rounded-lg hover:bg-dark-border transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{violation.type}</p>
                        <p className="text-sm text-gray-400">{violation.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{violation.plate}</p>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {violation.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function NavItem({ 
  icon: Icon, 
  label, 
  active, 
  collapsed,
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  collapsed: boolean,
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
        active 
          ? 'bg-primary-600 text-white' 
          : 'text-gray-400 hover:bg-dark-border hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="font-medium">{label}</span>}
    </button>
  )
}

export default App

