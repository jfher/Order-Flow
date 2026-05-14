export const toClientResponse = (client: any) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    address: client.address,
    createdAt: client.createdAt,
});

export const toClientListResponse = (clients: any[]) => {
    return clients.map((client) => toClientResponse(client));
};