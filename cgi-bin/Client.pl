package Client;

sub new {
   my $class = shift;
    my $self = {
        _firstName => shift,
        _lastName  => shift,
        _dni       => shift,
        _country       => shift,
        _isHere       => shift,
    };
}
