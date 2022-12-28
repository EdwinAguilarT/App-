#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;

my $q = CGI -> new;
print $q->header('text/xml;charset=UTF-8');

my @row;
my $first = $q->param('firstName');
my $last = $q->param('lastName');
my $dni = $q->param('dni');
my $country = $q->param('country');
my $isHere = $q->param('isHere');

if(defined($first) and defined($last) and defined($dni) and defined($country) and defined($isHere)){
    InsertClient($first,$last,$dni,$country,$isHere);
    successInsert($first,$last,$dni,$country,$isHere);
}else{
  showNewClient();
}

sub InsertClient{
  my $firstQuery = $_[0];
  my $lastQuery = $_[1];
  my $dniQuery = $_[2];
  my $countryQuery = $_[3];
  my $isHereQuery = $_[4];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "INSERT INTO Clients VALUES (?,?,?,?,?)";
  my $sth = $dbh->prepare($sql);
  $sth->execute($firstQuery, $lastQuery, $dniQuery, $countryQuery, $isHereQuery);
  $sth->finish;
  $dbh->disconnect;
}

sub successInsert{
  my $firstQuery = $_[0];
  my $lastQuery = $_[1];
  my $dniQuery = $_[2];
  my $countryQuery = $_[3];
  my $isHereQuery = $_[4];

  print <<XML;
  <client>
    <firstName>$firstQuery</firstName>
    <lastName>$lastQuery</lastName>
    <dni>$dniQuery</dni>
    <country>$countryQuery</country>
    <isHere>$isHereQuery</isHere>
  </client>
XML
}

sub showNewClient{
  print <<XML;
  <client>
  </client>
XML
}

