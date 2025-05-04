export interface FormAdaptor<F, D> {
  toDomain(form: F): D;

  fromDomain?(domain: D): F;
}
