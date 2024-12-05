
"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GroupCategory from '../interfaces/GroupCategory';

const CampaignMetricsComponent = ({metrics}:{metrics: GroupCategory[]}) => {

  console.log("metrics ", metrics)
 
  return (
    <div className="p-4 flex justify-center">
      {/* Funding by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Funding by Project Category</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={800} height={300} data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amountRaised" name="Total Raised (RBTC)" fill="#8884d8" />
            <Bar dataKey="backers" name="Number of Backers" fill="#82ca9d" />
          </BarChart>
        </CardContent>
      </Card>

      {/* Project Success Breakdown
      <Card>
        <CardHeader>
          <CardTitle>Project Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart width={500} height={300}>
            <Pie
              data={projectMetrics.fundingBreakdown}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {projectMetrics.fundingBreakdown.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default CampaignMetricsComponent;