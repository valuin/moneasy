import React from "react";
import { ChartColumn , FileText, Sparkles  } from 'lucide-react'; // Importing icons

const services = [
  {
    name: 'Data Visualization',
    desc: 'Get a comprehensive overview of your business with our data visualization tools.',
    icon: ChartColumn  // Icon for Analytics
  },
  {
    name: 'AI Chat Integration ',
    desc: 'Reading Data is Outdated, It\'s time to talk to your money with AI, Your AI is personalized to your business,',
    icon: Sparkles  // Icon for Reporting
  },
  {
    name: 'Streamline Bookkeeping',
    desc: 'Inputting data from your bookkeeping system and automatically syncing it to your database.',
    icon: FileText // Icon for Integrations
  }
];

export default function Services() {
  return (
    <section className="my-16 text-center" id="services">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
          Our Services
        </h2>
      </div>
      <div className="flex justify-center items-center space-x-4 flex-wrap gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex-none w-64 mb-8 mt-8 group hover:scale-105 transition-transform duration-300"
          >
            <div className="w-full h-64 mb-2 border-2 border-neutral-800 group-hover:border-emerald-500/80 rounded-xl shadow-xl group-hover:shadow-emerald-500/20 duration-300 bg-emerald-50 flex items-center justify-center">
              <service.icon className="w-16 h-16 text-emerald-600 group-hover:text-emerald-500/80 duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-emerald-500 duration-300">
              {service.name}
            </h3>
            <p className="text-white text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
