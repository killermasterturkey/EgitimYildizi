import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-xl',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: '',
    none: '',
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100%'),
  };

  if (animation === 'wave') {
    return (
      <div
        className={`${baseClasses} ${variantClasses[variant]} ${className} overflow-hidden relative`}
        style={style}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

// Pre-built skeleton components for common use cases

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={16} />
      </div>
    </div>
    <Skeleton variant="rounded" height={100} />
    <div className="flex gap-2">
      <Skeleton variant="rounded" width={80} height={32} />
      <Skeleton variant="rounded" width={80} height={32} />
    </div>
  </div>
);

export const LessonCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
    <Skeleton variant="rounded" height={120} className="mb-4" />
    <Skeleton variant="text" width="80%" height={24} className="mb-2" />
    <Skeleton variant="text" width="60%" height={16} className="mb-4" />
    <div className="flex justify-between items-center">
      <Skeleton variant="rounded" width={60} height={24} />
      <Skeleton variant="circular" width={32} height={32} />
    </div>
  </div>
);

export const GameCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
    <Skeleton variant="rectangular" height={160} />
    <div className="p-4 space-y-3">
      <Skeleton variant="text" width="70%" height={20} />
      <Skeleton variant="text" width="50%" height={16} />
      <Skeleton variant="rounded" height={40} />
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="space-y-6">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-6">
        <Skeleton variant="circular" width={80} height={80} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="40%" height={28} />
          <Skeleton variant="text" width="30%" height={20} />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
          <Skeleton variant="circular" width={40} height={40} className="mx-auto mb-2" />
          <Skeleton variant="text" width="60%" height={24} className="mx-auto mb-1" />
          <Skeleton variant="text" width="40%" height={16} className="mx-auto" />
        </div>
      ))}
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    {/* Header Card */}
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={64} height={64} className="!bg-white/20" />
        <div className="space-y-2">
          <Skeleton variant="text" width={200} height={24} className="!bg-white/20" />
          <Skeleton variant="text" width={150} height={16} className="!bg-white/20" />
        </div>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>

    {/* Activity Section */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <Skeleton variant="text" width={150} height={24} className="mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1 space-y-1">
              <Skeleton variant="text" width="70%" height={16} />
              <Skeleton variant="text" width="40%" height={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
    <div className="p-4 border-b dark:border-gray-700">
      <Skeleton variant="text" width={200} height={24} />
    </div>
    <div className="divide-y dark:divide-gray-700">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 flex items-center gap-4">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-1">
            <Skeleton variant="text" width="60%" height={16} />
            <Skeleton variant="text" width="40%" height={14} />
          </div>
          <Skeleton variant="rounded" width={80} height={32} />
        </div>
      ))}
    </div>
  </div>
);

export default Skeleton;
