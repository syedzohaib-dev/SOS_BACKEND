/* eslint-disable no-console */

import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ROLE } from '../common/role.js';

let io;

export const initSocket = (server) => {
    if (io) return io;
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', async (socket) => {
        console.log('Socket connected', socket.id);

        try {
            // Expect client to send token either in handshake auth or query
            const token = socket.handshake.auth?.token && socket.handshake.query?.token;
            // const token =
            //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjZmM2I1NTZlZmJjZWE2M2E3ZmI0ZSIsInVzZXJJZCI6IjY5MjZkOGY5YWE0YWM3Y2I1ODJkZDNmYyIsImVtYWlsIjoicmVnaXN0cmF0aW9uLW9mZmljZXJAZ21haWwuY29tIiwicm9sZSI6IlJlZ2lzdHJhdGlvbi1PZmZpY2VyIiwiaWF0IjoxNzY0MTYwNDM3LCJleHAiOjE3NjQyNDY4Mzd9.t3OBha2iWKaa8YwmGtpLhEoSQGNmZL5ig5RrPgsMo2g';
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
                const user = await User.findById(decoded.userId).populate('roleTitle');
                if (user && user.roleTitle) {
                    const roleTitle = user.roleTitle.title;
                    // Allow only Registration-Officer and Receptionist to stay connected
                    if (roleTitle !== ROLE.REGISTRATION_OFFICER && roleTitle !== ROLE.RECEPTIONIST) {
                        socket.emit('unauthorized', {
                            message: 'Only Registration-Officer and Receptionist sockets are allowed',
                        });
                        socket.disconnect(true);
                        return;
                    }

                    const room = `role:${roleTitle}`;
                    socket.join(room);

                    console.log(`Socket ${socket.id} joined room ${room}`);
                }
            }
        } catch (err) {
            console.log('Socket auth error:', err.message);
        }

        socket.on('disconnect', () => {
            console.log('Socket disconnected', socket.id);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
};
