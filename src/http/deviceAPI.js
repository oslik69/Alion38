import { $authHost, $host } from "./index";

// Функция для создания типа
export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type);
    return data;
};

// Функция для получения типов
export const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
};

// Функция для создания устройства
export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device);
    return data;
};

// Функция для получения всех устройств
export const fetchDevices = async (typeId, page, limit = 5) => {
    const { data } = await $host.get('api/device', {
        params: { typeId, page, limit }
    });
    return data;
};

// Функция для получения одного устройства
export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('api/device/' + id);
    return data;
};

// Функция для удаления устройства
export const deleteDevice = async (id) => {
    const { data } = await $authHost.delete(`api/device/${id}`);
    return data;
};

// Функция для удаления категории
export const deleteType = async (id) => {
    const { data } = await $authHost.delete(`api/type/${id}`);
    return data;
};
