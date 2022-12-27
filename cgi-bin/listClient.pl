#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;

my @firstName;
my @lastName;
my @dni;
my @country;
my @isHere;

my $q = CGI -> new;
print $q->header('text/xml;charset=UTF-8');

sub CheckClient {

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "SELECT firstName FROM Clients";
  my $sth = $dbh->prepare($sql);
  $sth->execute();
  while (my @row = $sth->fetchrow_array){
   $firstName[$i]=$row[0];
  }
  
  my $sql = "SELECT lastName FROM Clients";
  my $sth = $dbh->prepare($sql);
  $sth->execute();
  while (my @row = $sth->fetchrow_array){
   $lastName[$i]=$row[0];
  }

  my $sql = "SELECT dni FROM Clients";
  my $sth = $dbh->prepare($sql);
  $sth->execute();
  while (my @row = $sth->fetchrow_array){
   $dni[$i]=$row[0];
  }

  my $sql = "SELECT country FROM Clients";
  my $sth = $dbh->prepare($sql);
  $sth->execute();
  while (my @row = $sth->fetchrow_array){
   $country[$i]=$row[0];
  }

  my $sql = "SELECT isHere FROM Clients";
  my $sth = $dbh->prepare($sql);
  $sth->execute();
  while (my @row = $sth->fetchrow_array){
   $isHere[$i]=$row[0];
  }

}

sub showClient {
  my @first = $_[0];
  my @last = $_[1];
  my @dni = $_[2];
  my @country = $_[3];
  my @isHere = $_[4]; 

  my @body;

  for(my $i = 0; $i<@first; $i++){
    $body[$i] = <<XML;
    <client>
      <firstname>$first[$i]</firstname>
      <lasname>$las[$i]</lastname>
      <dni>$dni[$i]</dni>
      <country>$country[$i]</country>
      <ishere>$isHere[$i]</ishere>
    </client>
XML
  }

  return @body;
}

sub showTag {
 my @show = @_; 
 print <<XML;
 <clients>\n@show </clients>
XML
}
