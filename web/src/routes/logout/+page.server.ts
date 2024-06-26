import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	cookies.delete('dc-auth', { path: '/', domain: process.env.DEV ? 'localhost' : 'sckk.hu' });
	throw redirect(302, '/');
}) satisfies PageServerLoad;
