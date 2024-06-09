import React from 'react';

import { Action } from './Action';
import { IconBell, IconBellRinging, IconEdit, IconEditCircle, IconEditOff } from '@tabler/icons-react';

export function Edit(props) {
    return (
        <Action
            {...props}
            active={{
                fill: 'rgba(255, 70, 70, 0.95)',
                background: 'rgba(255, 70, 70, 0.1)',
            }}
        >
            <IconEdit fillOpacity={0} color='gray'/>
        </Action>
    );
}