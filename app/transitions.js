export default function() {
  this.transition(
    this.fromRoute('welcome'),
    this.toRoute('dashboard'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
