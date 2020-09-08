import {TABLE_RESIZE} from '@/redux/types';

// Actions creators
export function tableResize(data) {
	return {
		type: TABLE_RESIZE,
		data
	}
}
