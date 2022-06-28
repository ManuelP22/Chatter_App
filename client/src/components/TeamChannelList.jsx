import React from 'react'

import { AddChannel } from '../assets';

function TeamChannelList({ children, error = false, loading, type }) {
    if(error){
        return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Error de conexion, porfavor espere un momento e intentelo denuevo.
                </p>
            </div>
        ) : null;
    }

    if(loading) {
        return (
            <div className="team-channel-list">
            <p className="team-channel-list__message loading">
                {type === 'team' ? 'Canales' : 'Mensajes'} cargando...
            </p>
        </div>
        )
    }
  
    return (
    <div className="team-channel-list">
        <div className="team-channel-list__header">
            <p className="team-channel-list__header__title">
            {type === 'team' ? 'Canales' : 'DMs'}
            </p>
            {/* Button add channel */}
        </div>
        {children}
    </div>
  )
}

export default TeamChannelList