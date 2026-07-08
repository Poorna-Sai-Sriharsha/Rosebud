import { motion } from 'framer-motion';

export function StepPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl p-6 lg:p-8"
    >
      <h2 className="font-serif text-xl text-warm-950 mb-6">{title}</h2>
      {children}
    </motion.div>
  );
}

export function ReviewSection({
  title,
  children,
  onEdit,
}: {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-warm-100">
      <div>
        <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-1.5">{title}</p>
        {children}
      </div>
      <button onClick={onEdit} className="text-xs text-primary-600 hover:text-primary-800 font-medium underline">
        Edit
      </button>
    </div>
  );
}

export function SummaryRow({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-warm-500">{label}</span>
      <span className={`font-medium ${green ? 'text-success' : 'text-warm-900'}`}>{value}</span>
    </div>
  );
}
