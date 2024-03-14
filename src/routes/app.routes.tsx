import { Routes, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { Details } from '../pages/Details'
import { FluxoBot } from '../pages/FluxoBot'
import { Configurations } from '../pages/Configurations'
import { Contacts } from '../pages/Contacts'
import { Bots } from '../pages/Bots'
import { BotConfig } from '../pages/BotConfig'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/bots" element={<Bots />} />
            <Route path="/bot/:token" element={<BotConfig />} />
            <Route path="/fluxo-bot/:token" element={<FluxoBot />} />
            <Route path="/contacts/:token" element={<Contacts />} />
            <Route path="/configuration" element={<Configurations />} />
            <Route path="*" element={<Home />} />
        </Routes>
    )
}