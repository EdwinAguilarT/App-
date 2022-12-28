#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;

my $q = CGI->new;
print $q->header('text/xml;charset=UTF-8');

my @row;
my $dni = $q->param('dni');

if(defined($dni)) {
  if(checkDni($dni)){
    showTag(@row);
  } else {
    showTag();
  }
} else {
  showTag();
}

sub checkDni{
  my $dni = $_[0];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");
  my $sql = "SELECT * FROM Clients WHERE dni=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($dni);
  @row = ($sth->fetchrow_array);
  $sth->finish;
  $dbh->disconnect;
  return @row;
}

sub showTag{
  my @rowQuery = @_;
  print "<client>\n";
  if(@rowQuery){
    print "<firstName>$rowQuery[0]</firstName>\n";
    print "<lastName>$rowQuery[1]</lastName>\n";
    print "<dni>$rowQuery[2]</dni>\n";
    print "<country>$rowQuery[3]</country>\n";
    print "<isHere>$rowQuery[4]</isHere>\n"
  }
  print "</client>\n";
}
