#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;

my $q = CGI->new;
print $q->header('text/xml;charset=UTF-8');

my @row;
my $first = $q->param('firstName');
my $last = $q->param('lastName');
my $dni = $q->param('dni');
my $country = $q->param('country');
my $isHere = $q->param('isHere');

if(defined($first) and defined($last) and defined($dni) and defined($country) and defined($isHere)){
  if(checkClient($dni)){
    updateComponents($dni, $first, $last, $country, $isHere);
    checkClient($dni);
    showTag(@row);
  }else{
    showTag();
  }
}else{
  showTag();
}

sub checkClient{
  my $dniQuery = $_[0];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "SELECT * FROM Clients WHERE dni=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($dniQuery);
  @row = ($sth->fetchrow_array);
  $sth->finish;
  $dbh->disconnect;
  return @row;
}

sub updateComponents{
  my $dniQuery = $_[0];
  my $firstQuery = $_[1];
  my $lastQuery = $_[2];
  my $countryQuery = $_[3];
  my $isHereQuery = $_[4];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "UPDATE Clients SET firstName=?, lastName=?, country=?, isHere=? WHERE dni=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($firstQuery, $lastQuery, $countryQuery, $isHereQuery, $dniQuery);
  $sth->finish;
  $dbh->disconnect;
}

sub showTag{
  my @rowQuery = @_;
  if(@rowQuery){
    print<<XML;
    <client>
      <firstName>$rowQuery[0]</firstName>
      <lastName>$rowQuery[1]</text>
      <dni>$rowQuery[2]</dni>
      <country>$rowQuery[3]</country>
      <isHere>$rowQuery[4]</isHere>
    </client>
XML
  }else{
    print<<XML;
    <client>
    </client>
XML
  }
}
