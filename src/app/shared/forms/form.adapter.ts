export interface FormAdapter<F, D> {
  toDomain(form: F): D;

  fromDomain?(domain: D): F;
}
