import React from 'react';

const StaticMap: React.FC<{ className?: string; center?: string; zoom?: string; size?: string }> = ({
  className,
  center = '13.736717,100.523186',
  zoom = '14',
  size = '600x400',
}) => {

  return (
  <div className={className}>
    <div className="h-[360px] rounded-2xl bg-gray-100 flex flex-col items-center justify-center">
      <p className="mt-3 font-bold">บริษัท NT</p>
      <p className="text-sm text-gray-500">
        บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)
      </p>
    </div>
  </div>
);
};

export default StaticMap;