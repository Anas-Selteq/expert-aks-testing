import React from 'react'
import Skeleton from '@mui/material/Skeleton';

function SkeletonLoaders() {
    return (
        <div className="row">
            <div className="col-md-2 col-3 ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 mt-md-4  ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 mt-md-4  ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 mt-4 display_pc  ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 mt-4 display_pc ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 mt-4 display_pc  ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
            <div className="col-md-2 col-3 mt-4 display_pc ">
                <Skeleton variant="circular" className="skleton_landing" />
                <Skeleton className="skleton_landing_typ" />
            </div>
        </div>
    )
}

export default SkeletonLoaders