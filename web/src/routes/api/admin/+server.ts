import { apiUrl } from '$lib/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, cookies }) => {
	const dcauth = cookies.get('dc-auth') as string;
	if (dcauth) {
		if (request.headers.get('current') === 'false') {
			const mama = await fetch(
				request.headers.get('am') === 'true'
					? `${apiUrl}/user/admin/am/get/${request.headers.get('type')}`
					: `${apiUrl}/user/admin/get/${request.headers.get('type')}`,
				{
					headers: {
						cookie: dcauth,
						status: request.headers.get('status') as string
					}
				}
			);
			if (mama.ok) {
				return new Response(JSON.stringify({ data: await mama.json(), api: apiUrl }));
			}
		} else {
			const mama = await fetch(
				request.headers.get('am') === 'true'
					? `${apiUrl}/user/admin/am/get/current/${request.headers.get('type')}`
					: `${apiUrl}/user/admin/get/current/${request.headers.get('type')}`,
				{
					headers: {
						cookie: dcauth,
						status: request.headers.get('status') as string
					}
				}
			);
			if (mama.ok) {
				return new Response(JSON.stringify({ data: await mama.json(), api: apiUrl }));
			}
		}
	}
	return new Response(null, { status: 400 });
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();
	if (!body) return new Response(null, { status: 404 });
	const dcauth = cookies.get('dc-auth') as string;
	if (dcauth) {
		const mama = await fetch(`${apiUrl}/user/admin/post`, {
			method: 'post',
			headers: {
				cookie: dcauth,
				'Content-Type': 'application/json'
			},
			mode: 'no-cors',
			body: JSON.stringify(body)
		});
		if (mama.ok) {
			return new Response(JSON.stringify(await mama.json()));
		}
		return new Response(JSON.stringify({ error: true }));
	}
	return new Response(null, { status: 400 });
};
