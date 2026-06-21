import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, Filter, Calendar as CalIcon, TrendingUp, DollarSign } from 'lucide-react';
import { format, subMonths } from 'date-fns';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getPaymentSummary, getRevenueTrend } from '../../services/paymentService';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';

const Reports = () => {
  const [period, setPeriod] = useState('6m'); // 6m, 1y, ytd

  const { data: summary } = useQuery({
    queryKey: ['payment-summary'],
    queryFn: getPaymentSummary,
  });

  const { data: trendData = [] } = useQuery({
    queryKey: ['revenue-trend', period],
    queryFn: () => getRevenueTrend(period === '6m' ? 6 : 12),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal">Financial Reports</h1>
          <p className="text-sm text-muted">Analyze your portfolio's financial performance.</p>
        </div>
        <Button variant="outline" leftIcon={<Download size={16} />}>Export CSV</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-3 gap-5">
        <StatCard 
          title="Total Revenue (MTD)" 
          value={summary?.collected || 0} 
          isCurrency 
          trend={12.5} 
          icon={DollarSign}
          color="bg-success/10"
          iconColor="text-success"
        />
        <StatCard 
          title="Outstanding Balance" 
          value={summary?.overdue || 0} 
          isCurrency 
          icon={TrendingUp}
          color="bg-error/10"
          iconColor="text-error"
        />
        <StatCard 
          title="Expected Revenue" 
          value={summary?.expected || 0} 
          isCurrency 
          icon={CalIcon}
          color="bg-info/10"
          iconColor="text-info"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-charcoal">Revenue over time</h2>
            <select 
              value={period} 
              onChange={(e) => setPeriod(e.target.value)}
              className="text-xs border-border rounded py-1 px-2 focus:ring-primary"
            >
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last 12 Months</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B4F45" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0B4F45" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E1DA" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8A8A72' }} dy={10} />
                <YAxis 
                  tickFormatter={(v) => `₦${(v/1000000).toFixed(1)}M`} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#8A8A72' }}
                  dx={-10}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0B4F45" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-charcoal mb-6">Collection Rate</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E1DA" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8A8A72' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#8A8A72' }}
                  dx={-10}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Collected']}
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#C75B30" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="text-center py-8">
          <p className="text-muted text-sm mb-4">Detailed transaction ledger is available for CSV export.</p>
          <Button leftIcon={<Download size={16} />}>Download Full Ledger (CSV)</Button>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
