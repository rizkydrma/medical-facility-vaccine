export interface IProvince {
  key: string;
  value: string;
}

export interface ICity {
  key: string;
  value: string;
}

export interface IFacilityVaccine {
  id: number;
  kode: string;
  nama: string;
  kota: string;
  provinsi: string;
  alamat: string;
  latitude: string;
  longitude: string;
  telp: string;
  jenis_faskes: string;
  kelas_rs: string;
  status: string;
  detail: IFacilityVaccineDetail[];
  source_data: string;
}

export interface IFacilityVaccineDetail {
  id: number;
  kode: string;
  batch: string;
  divaksin: number;
  divaksin_1: number;
  divaksin_2: number;
  batal_vaksin: number;
  batal_vaksin_1: number;
  batal_vaksin_2: number;
  pending_vaksin: number;
  pending_vaksin_1: number;
  pending_vaksin_2: number;
  tanggal: string;
}
