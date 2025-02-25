import React from 'react';

import RegTopNav from './RegTopNav';
import RegSideNav from './RegSideNav';

const RegLayout = ({children}) => {
    return (

<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
{/* TopNav */}
<RegTopNav/>

{/* Main Container */}
<div style={{ display: 'flex', flexGrow: 0.5, overflow: 'hidden' }}>
  {/* SideNav */}
  <div
    style={{
      flex: '0 0 15%',
      overflowY: 'auto',
      position: 'sticky',
      top: '64px',
      height: 'calc(100vh - 64px)',
      zIndex: '10',
    }}

    className="SideNavBarFlex"
  >
    <RegSideNav />
  </div>

  {/* Content */}
  <div
    style={{
      flex: '1',
      overflow: 'auto',
      marginLeft: '20px',
      padding: '20px',
      minWidth: 0,
    }}
  >
    {children}
    </div>
        </div>
      </div>
      );
    };
    export default RegLayout;